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
        //probabaly because releaseNotesGenerator too has to parse
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
    [
      '@semantic-release/git',
      {
        message:
          'fix(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['docs/CHANGELOG.md', 'package.json'],
      },
    ],
  ],
};
