// Only Types
// eslint-disable-next-line import/no-extraneous-dependencies
import { TestResult, AggregatedResult } from '@jest/reporters';

import path from 'path';
import stripAnsi from 'strip-ansi';
import createCheck, { Annotation } from 'create-check';
import execa from 'execa';

const APP_ID = 38833;
/**
 * Before you say anything I *know* this is horribly insecure.
 *
 * If we were not to to this then every user would have to create
 * their own GitHub App and manage the APP_ID and PRIVATE_KEY through
 * env vars.
 *
 * How could this go wrong? Well this PRIVATE_KEY only creates jwt
 * tokens that work on people who have installed the Jest Results
 * App. If an attacker got ahold of the token they could only read repo
 * metadata and read/write checks. So the attack surface is really only
 * messing with a users checks, which is not too risky.
 */
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAwKPGnXvRdbkXXaIzw2YV4ykKCx6Lx1N+FAByUvQ5k7XaaSsi
X7MFx3XJlUVMNf47ur5NQ2KjkDqA4Q9alb99yxUzSnsLBsHWQKEUZKmP86dqe2Ku
a2XG+GYtUnaaRrAsj8BWqFZ1Hq38P8ge8BIA51+pgpYOsX3imT5PhJfloeMXCMQ4
GU+nJf8s0DzxRav3THzDKfzbQ487B1CbcTcEM70v+lFCKX36AzssYnKiEEyDOlUO
6HkwQB+CTvQgB51JatmFFFZfCgnjYPQHtO6YqFWn8QBF0s9wHhoHWBNx+ZKoOVKw
qOKcFwYmHdAzpuLmt0gGp4ewBswImJVpsekBQQIDAQABAoIBADp5/LKVgXHQ68za
jggElyRLsubJMPki2STNNecEh+3UyCYgl+ChAWIY2UZcsNO7BvqbBe0spiYD/FdV
R9QpOtBI8Tbsvt4gPR+FRiGAb1gxO9uUiwnC7XE94wgjRJWsqPpCEowrIoZbnjTm
VK3faTLTESu4zWEHq5+FELJZQbWwJ/SjJkA1viizBLSLCnhlMzsabHZHKtLPvZJ0
tnRPVidp1hzQzDOIQBdojUvMZ3evLqYL1pwoRnqitotuchDprTUqGfBLFy1A+1iK
QqPpHnDe8oEeITOi8cJhOmyk2ZmkSIyRmqZi9Cf/lItQBKws8aHUIoex7AfpXK30
1mP1wAECgYEA+WIhAzEj7wXu/J+fPfZs0eW8htGtxQTQYpLztfxKGqS4spGJcj89
ga0MNvGAexNMsWW+n9SHNhVuJB7XSuxMrvXPuMPfwT1u910Ah/Wh+61saAOHRA+O
3c+OyI2ojTchsoC3k1VZ0RTeDZXL870+wLmf1MqEOGovvnUx10oGfcECgYEAxcA7
JJko/IbkCECtxcupIieZJdELDSkRdFZgVVHZcxwujJxyj2O/YZB31c6AaCbWnIO3
s98SPhLLS4b10pEqR8FbCKKm9MiqWybAeWn14IM4EAgGRReWquTOWv/bDLjKphTr
oMm4lBm1dXrOfIuNyTOAJPIjJvtUCjfAroaCY4ECgYBllKIL0c1oREt3nXFY5PKo
gOLNK8WTdgWH0YHyBAUPWz9chUmuPrJICvvpuW9zMoZP0DjYk9JLpmkJz4I0o5IM
xlXJVgfjh6mWmsxnlRdZE+gPajiD8a5pDW2EpacddnKEakfcfKysLMrST80WyGQy
TqobHC7FaANwmf4mSqHgQQKBgBwgCAlfgzXPVZVa5ZwxKCAEc8KuJZ08jw/1zQO1
fXDivDghdCWysSCGNJUDJr4pb/KYxULe4jBT6fgW/NVy8gl8lZ73yzkbZSdLrqpW
CLNi1lFpYsLm5PXvTu4gX55ClgfjB9Q5fHgL5AQOcFnEW2kXWw1mJtu/eSdu4Iex
98+BAoGAOF4GUl/Aa6rJNgjBUNZjUomV+FJL3htuu1b3t2tLGnozPxFS6RPMWLvd
AMBi+Wv6FzuOhZx6aIMlz/LEgC+s9o3S+mSlsp0/UoNcy7j1zSosb4C8QqXbTGRG
sUdulK+rOI5aef3CRA2/j6V1expVZF/ttOsmybZcuUcSGxN1N5Q=
-----END RSA PRIVATE KEY-----
`;

interface Location {
  column: number;
  line: number;
}

async function createAnnotations(results: TestResult[]) {
  const repoRoot = (await execa('git', ['rev-parse', '--show-toplevel'])).stdout;

  const annotations: Annotation[] = [];

  for (const result of results) {
    const { testFilePath, testResults } = result;

    for (const failure of testResults) {
      if ('location' in failure) {
        const { location = {} as Location, failureMessages } = failure as {
          failureMessages: string[];
          location: Location;
        };

        if (location) {
          failureMessages.forEach(message => {
            const numbers = message.match(
              new RegExp(`${result.testFilePath}:(\\d+):\\d+`)
            );
            const start_line = numbers
              ? Number(numbers[1])
              : location.line || 0;

            annotations.push({
              path: path.relative(repoRoot, testFilePath),
              start_line,
              end_line: start_line,
              annotation_level: 'failure',
              message: failureMessages.map(stripAnsi).join('\n')
            });
          });
        }
      }
    }
  }

  return annotations;
}

export default async (results: AggregatedResult) =>
  createCheck({
    tool: 'Jest',
    name: process.env.GH_CHECK_NAME || 'Test',
    annotations: await createAnnotations(results.testResults),
    errorCount: results.numFailedTests,
    appId: process.env.JEST_APP_ID ? Number(process.env.JEST_APP_ID) : APP_ID,
    privateKey: process.env.JEST_PRIVATE_KEY || PRIVATE_KEY
  });
