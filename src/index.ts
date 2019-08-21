import createCheck from './create-check';

class GitHubReporter {
  // eslint-disable-next-line class-methods-use-this
  async onRunComplete(
    contexts: Set<jest.Test['context']>,
    testResult: ReturnType<jest.TestResultsProcessor>
  ) {
    await createCheck(testResult);
  }
}

export = GitHubReporter;
