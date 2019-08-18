import envCi from 'env-ci';
import execa from 'execa';
import path from 'path';
import Octokit from '@octokit/rest';

import auth from './auth';
import StdIo from './StdIo';

const stdio = new StdIo();
const { isCi, ...env } = envCi();
const [owner = 'hipstersmoothie', repo = 'jest-github-reporter'] =
  'slug' in env ? env.slug.split('/') : [];

function createAnnotations(results: jest.TestResult[]) {
  const annotations: Octokit.ChecksCreateParamsOutputAnnotations[] = [];

  // stdio.log(JSON.stringify(results));

  for (const result of results) {
    const { testFilePath, testResults } = result;

    for (const failure of testResults) {
      if ('location' in failure) {
        failure;
        const { location: { line }, failureMessages } = failure as {
          failureMessages: string[];
          location: { column: number; line: number };
        };

        annotations.push({
          path: path.relative(process.cwd(), testFilePath),
          start_line: line,
          end_line: line,
          annotation_level: 'failure',
          message: failureMessages.join('\n')
        });
      }
    }
  }

  return annotations;
}

async function addCheck(results: jest.TestResult[], errorCount: number) {
  // if (!isCi) {
  //   return;
  // }

  const annotations = createAnnotations(results);
  const HEAD = await execa('git', ['rev-parse', 'HEAD']);
  // const octokit = await auth();
  // const summary =
  //   (errorCount > 0 && 'Your project seems to have some errors.') ||
  //   'Your project passed lint!';

  // stdio.log(JSON.stringify(annotations, null, 2));

  // await octokit.checks.create({
  //   owner,
  //   repo,
  //   name: 'Lint',
  //   head_sha: HEAD.stdout,
  //   conclusion: (errorCount > 0 && 'failure') || 'success',
  //   output: {
  //     title: 'Jest Results',
  //     summary,
  //     annotations
  //   }
  // });
}

class GitHubReporter {
  async onRunComplete(
    contexts: Set<jest.Test['context']>,
    testResult: ReturnType<jest.TestResultsProcessor>
  ) {
    if (testResult.numFailedTests > 0) {
      await addCheck(testResult.testResults, testResult.numFailedTests);
      stdio.log('Successfully posted test results to github.');
    }
  }
}

export = GitHubReporter;
