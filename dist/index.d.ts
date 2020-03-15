/// <reference types="jest" />
interface GithubReporterConfig {
    /**
     * If set to true, the reporter will comment on lines which were added in the pull request but
     * have no code coverage. If false, then uncovered lines will not fail the build.
     */
    failOnUncoveredLines?: boolean;
}
declare class GitHubReporter {
    private config;
    constructor(globalConfig: jest.GlobalConfig, config: GithubReporterConfig);
    onRunComplete(contexts: Set<jest.Test['context']>, testResult: ReturnType<jest.TestResultsProcessor>): Promise<void>;
}
export = GitHubReporter;
//# sourceMappingURL=index.d.ts.map