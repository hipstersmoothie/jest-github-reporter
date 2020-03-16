// Only Types
// eslint-disable-next-line import/no-extraneous-dependencies
import { AggregatedResult, Test } from '@jest/reporters';

import createCheck from './create-check';

class GitHubReporter {
  // eslint-disable-next-line class-methods-use-this
  async onRunComplete(
    contexts: Set<Test['context']>,
    testResult: AggregatedResult
  ) {
    await createCheck(testResult);
  }
}

export = GitHubReporter;
