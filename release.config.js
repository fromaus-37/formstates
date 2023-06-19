/* eslint-env node */

module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { breaking: true, release: 'major' },
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'fix', release: 'patch' },
          { type: 'deps', release: 'patch' },
          { type: 'feat', release: 'minor' },
        ],
        parserOpts: {
          mergePattern:
            '^Merged PR (\\d+): (\\w*)(?:\\(([\\w\\$\\.\\-\\*]*)\\))?\\: (.*)$',
          mergeCorrespondence: ['id', 'type', 'scope', 'subject'],
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            {
              type: 'docs',
              section: 'Documentation',
              hidden: false,
            },
            {
              type: 'fix',
              section: 'Bug fixes',
              hidden: false,
            },
            {
              type: 'feat',
              section: 'New features',
              hidden: false,
            },
            {
              type: 'perf',
              section: 'Performance improvement',
              hidden: false,
            },
            {
              type: 'style',
              section: 'Code style adjustments',
              hidden: false,
            },
            {
              type: 'test',
              section: '(Unit)test cases adjusted',
              hidden: false,
            },
            {
              type: 'refactor',
              section: 'Refactor',
              hidden: false,
            },
            {
              type: 'deps',
              section: ':arrow_up: Dependency updates',
              hidden: false,
            },
          ],
          issueUrlFormat: `${process.env.SYSTEM_COLLECTIONURI}{{repository}}/_workitems/edit/{{id}}/`,
          commitUrlFormat: `${process.env.SYSTEM_COLLECTIONURI}{{repository}}/_git/{{repository}}/commit/{{hash}}`,
        },
        writerOpts: {
          finalizeContext: function (context) {
            return {
              ...context,
              repository: process.env.SYSTEM_TEAMPROJECT,
              repoUrl: process.env.SYSTEM_COLLECTIONURI,
              commit: '_git/<repository>/commit',
              issue: '_workitems/edit',
            };
          },
        },
        //this really does need to be declared again
        //(declaring it in the commitAnalyzer once is not enough)
        //probably because releaseNotesGenerator too has to parse
        //the commits
        parserOpts: {
          mergePattern:
            '^Merged PR (\\d+): (\\w*)(?:\\(([\\w\\$\\.\\-\\*]*)\\))?\\: (.*)$',
          mergeCorrespondence: ['id', 'type', 'scope', 'subject'],
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md',
      },
    ],
    // TODO: note in article
    //
    // 1. git plugin was removed as it does git tag, commit
    //  and push to what ever the remote of the repo that you
    //  checked out is (this should be origin on local machine
    //  but may be different in a DevOps environment)
    //  Optionally it can add files as well like the generated
    //  release notes/changelog which is how I had configured it
    //  previously.
    //
    // 2. git plugin was a separate install.
    //
    // 3. For GitHub Actions and repo env, I no longer
    //  need it as `/github` plugin is inclucded by default
    //  when you install semantic-release.
  ],
};
