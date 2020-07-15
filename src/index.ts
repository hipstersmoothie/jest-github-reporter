// Only Types
// eslint-disable-next-line import/no-extraneous-dependencies
import { AggregatedResult, Test } from '@jest/reporters';

import createCheck from './create-check';

interface GithubReporterConfig {
  /**
   * If set to true, the reporter will comment on lines which were added in the pull request but
   * have no code coverage. If false, then uncovered lines will not fail the build.
   */
  failOnUncoveredLines?: boolean;
};

class GitHubReporter {
  private config: GithubReporterConfig;

  constructor(globalConfig: jest.GlobalConfig, config: GithubReporterConfig) {
    this.config = config;
  }

  async onRunComplete(
    contexts: Set<Test['context']>,
    testResult: AggregatedResult
  ) {
    await createCheck(testResult, this.config);
  }
}

export = GitHubReporter;
