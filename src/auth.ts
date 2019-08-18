import { request } from '@octokit/request';
import { App } from '@octokit/app';
import Octokit from '@octokit/rest';
import envCi from 'env-ci';

const APP_ID = process.env.APP_ID ? Number(process.env.APP_ID) : 38833;
/**
 * Before you say anything I *know* this is horribly insecure.
 *
 * If we were not to to this then every user would have to create
 * their own GitHub App and manage the APP_ID and PRIVATE_KEY through
 * env vars.
 *
 * How could this go wrong? Well this PRIVATE_KEY only creates jwt
 * tokens that work on people who have installed the ESLint Results
 * App. If an attacker got ahold of the token they could only read repo
 * metadata and read/write checks. So the attack surface is really only
 * messing with a users checks, which is not too risky.
 */
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  `
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEArZbSLA/1PzHxdDbSlOBlCHmcMye/09/d+RYS8egfUbgtVfbR
PEEwQfsA8YEeQbNDGbdagoxjwwCNs0p6oswrrvynRtHJq7yIsQpF9p6M/yaTXuS4
+fofJ36C7nrczZ7e6h9tSeA5Q7f0fq5FOZiTMzT7Cqa1c5APVEUox/BqiBmcErhM
eUGHD+Loe73O7LpI9+KBYZLuEl5YFo/PBWmrDEZCJOThQxHZ94O+kns3nnpV7xSs
UlO6+p9b95KRbg+CyCAASl9LE/TX+Th4VFJy4wCSZAwkctdaKDfmKZbcCEVIBLdH
NipnZNSPspwKfDOtcim98YsArU4zKR0GxrHR0QIDAQABAoIBAQCpKnC5ZffPVSGD
6qU/Voq/PpwdMiB8Hw9X3c4qltZmsgDkZHq1qKWZtz3NHNJanpLGretzi9Lwx0pQ
LkXi/uuXRTrTBkDtrvba6TMTSqIHSRWXBXjKi5juyRhZxbwGWkvMh0HfG7dSqiOH
jNeDcJAK+Bep4pqz+vElY5yBdGatKATcx0IaI0mcrVKvtxlptjs1kJH4VWJ0xml8
74qNLfCRaPa95oh/vXb9P+a0QjnctHiGaEDdpRmgQE0A2SsZ3Ni8supSzfIRdKqk
3ClrzlHf8z3mQvOsIFzmoHwCEL3m8+AXcQ0gm/7vZ0hCmQepLQXYEnxr9TAtykmY
aHBADWv9AoGBANnJrPjMEcKEKFEdwif+D5pMEAjj5Kar1ynxxMwGEwBhUB7LmSKe
WybLaSu1xtYnjapcTz1esefOU8o66bLAE602nRmew+/DMHtCaZgqzAMZyqS351ZH
RpkYeSjLXxoCzVxBbdGLGa6Fa1unijAcJsQwVk/xTIv5tlLUIZ72j8WDAoGBAMwL
4nl1Gr/DltbrRgOcEYlPc3mhM4AnX5Kowlb5GYAlY8gFAfMiqd7M0n34Vpv/m3HK
K9ZNiPvzzlwtUzlcJVeUlUZwQByRRzWtykbmW80klYYPIUxfQ8Yo/vqKfJ8Cg+O/
uRTSAHI3XWd0Xg3p2Z3R6n/pkw0WF5N9T0oJhH8bAoGBANiTKaOwq+iXq9Aem7lR
eQqjoT52AieMs0dO2blaQQMbwqUdKoe2mkaV+VwyRC0q4EIN0e7hgGFYWRK+SzAq
umaB7PBRZd/EZy3r+T4NMRvURiRPjYnLD3WnVLUwqL4hEz8vAZpjjYJzwzM+BLmb
BSIMP4j4GHsKNDliIp0F7CspAoGANRf+lTYYgL+HF2Ne839/vKf01zhP60/TeZj6
AKGOth6EiT5sVHS3mObY+rhM6QiozQIbSAci1tSI5MlSd4F3ogNimFKLDCPtUJVp
Jeu5BXc4hQqY0oOTYhO2zUCNzt5brT5tDXLbdNzdLBdGhf5MhtlhWGlRvzz5Y4Je
yFgTpvMCgYEAg91o6HlwwazvzaQL7sMKUi+PW1rkckooKm+hsxabI0bO3auhVibx
BU5ZeYjMfqiOpbXmjcmQ+1BB9zOI+Tf79w82zwmKWmagl+m5/Jx9nmYQXeXMoVAC
Pt4SCU1SY+eXYO+nAy6oKEUx0dHFfzj5PZFZr5iP9DDZsrdz0ZXsdn4=
-----END RSA PRIVATE KEY-----`;

const { isCi, ...env } = envCi();
const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY });
const jwt = app.getSignedJsonWebToken();
const [owner = '', repo = ''] = 'slug' in env ? env.slug.split('/') : [];

export default async function authenticateApp() {
  const { data } = await request('GET /repos/:owner/:repo/installation', {
    owner,
    repo,
    headers: {
      authorization: `Bearer ${jwt}`,
      accept: 'application/vnd.github.machine-man-preview+json'
    }
  });

  const installationId = data.id;
  const token = await app.getInstallationAccessToken({
    installationId
  });

  return new Octokit({
    auth: token,
    previews: ['symmetra-preview']
  });
}
