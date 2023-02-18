export const mockContentFileWithoutRootPath = `
yarn run v1.22.19
--------------------|---------|----------|---------|---------|-------------------

Test Suites: 1 failed, 1 skipped, 17 passed, 18 of 19 total
Tests:       7 failed, 11 skipped, 271 passed, 289 total
Snapshots:   0 total
Time:        38.674 s
Ran all test suites matching /src/payments/payments.service.spec.ts|src/invoices/invoices.service.spec.ts|src/registrations/registrations.service.spec.ts|src/vindi/vindi.service.spec.ts|src/bills/bills.service.spec.ts|src/credit-card/credit-card.service.spec.ts|src/subscriptions/subscriptions.service.spec.ts|src/financialGuardians/financialGuardians.service.spec.ts|src/users/users.service.spec.ts|src/coupons/coupons.service.spec.ts|src/auth/auth.service.spec.ts|src/contract/contract.service.spec.ts|src/vindi/vindi.controller.spec.ts|src/schedulers/schedulers.service.spec.ts|src/registrations/listeners/registrationEvent.listener.spec.ts|src/bills/listeners/billsEvent.listener.spec.ts|src/invoices/invoice.cron.service.spec.ts|src/users/users.controller.spec.ts|src/users/me.controller.spec.ts/i.
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files           |   71.21 |    45.45 |    62.5 |   72.58 |
coupons.service.ts |   71.21 |    45.45 |    62.5 |   72.58 | 31-61,126
--------------------|---------|----------|---------|---------|-------------------
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
`;

export const mockContentFileWithRootPath = `
---------------------------------|---------|----------|---------|---------|-----------------------------
File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s           
---------------------------------|---------|----------|---------|---------|-----------------------------
All files                        |   23.07 |    13.04 |   19.44 |   22.22 |                             
 src                             |       0 |        0 |       0 |       0 |                             
  index.ts                       |       0 |        0 |       0 |       0 | 1-78                        
 src/constants                   |       0 |      100 |     100 |       0 |                             
  github.ts                      |       0 |      100 |     100 |       0 | 1                           
 src/generators                  |   18.75 |        0 |       0 |   19.04 |                             
  genCoverageReportInMarkdown.ts |   18.75 |        0 |       0 |   19.04 | 11,31-56,67-71,75-92,96-105 
 src/stages                      |   16.66 |        0 |       0 |   12.96 |                             
  createCoverageTextFile.ts      |      25 |        0 |       0 |   21.42 | 5-22                        
  createReportComment.ts         |       0 |        0 |       0 |       0 | 1-52                        
  getPrDiffFiles.ts              |       0 |      100 |       0 |       0 | 1-17                        
  getRelatedTestFiles.ts         |    37.5 |      100 |       0 |   28.57 | 4-11                        
  runTests.ts                    |      75 |      100 |       0 |   66.66 | 4                           
 src/utils                       |      40 |    31.03 |   46.66 |   40.22 |                             
  generateJestTestCmd.ts         |       0 |      100 |       0 |       0 | 6-25                        
  getActionParams.ts             |       0 |        0 |       0 |       0 | 1-26                        
  getContentFile.ts              |       0 |        0 |       0 |       0 | 1-20                        
  getJestParams.ts               |   35.29 |        0 |       0 |   26.66 | 8-16,20-33                  
  parseCoverageReportFromTextFile.ts   |     100 |       90 |     100 |     100 | 12                          
  parseMarkdownTemplate.ts       |       0 |        0 |       0 |       0 | 1-24                        
  safeRunStage.ts                |       0 |      100 |       0 |       0 | 1-7                         
---------------------------------|---------|----------|---------|---------|-----------------------------`;
