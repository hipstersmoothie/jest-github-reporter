export interface GithubReporterConfig {
  /**
   * If set to true, the reporter will comment on lines which were added in the pull request but
   * have no code coverage. If false, then uncovered lines will not fail the build.
   */
  failOnUncoveredLines?: boolean;
};
