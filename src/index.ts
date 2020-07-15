// Only Types
// eslint-disable-next-line import/no-extraneous-dependencies
import { AggregatedResult, Test } from '@jest/reporters';

import createCheck from './create-check';
import { GithubReporterConfig } from './types';

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
