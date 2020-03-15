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
    contexts: Set<jest.Test['context']>,
    testResult: ReturnType<jest.TestResultsProcessor>
  ) {
    console.log('coverageMap', JSON.stringify(testResult.coverageMap, null, 2));

    await createCheck(testResult, this.config);
  }
}

export = GitHubReporter;
