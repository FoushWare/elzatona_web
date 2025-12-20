what is the issue and how to fix it ?

# 1-

Skip to content
Navigation Menu
FoushWare
elzatona_web

Type / to search
Code
Issues
45
Pull requests
Discussions
Actions
Projects
Security
5,000+
Insights
Settings
SonarCloud Code Analysis
Final workflow fixes before merge #416
Jobs
Run details
Annotations
1 error and 20 warnings
SonarQube
failed 7 minutes ago in 4m 35s
Search logs
1s
9s
2s
1m 9s
0s
14s
13s
23s
2m 11s
11s
Run SonarSource/sonarqube-scan-action@v6
Installing Sonar Scanner CLI 7.2.0.5079 for linux-x64...
Downloading from: https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-7.2.0.5079-linux-x64.zip
/usr/bin/unzip -o -q /home/runner/work/\_temp/083dfab3-c61b-4315-b5ba-2e5b164ea642
Sonar Scanner CLI cached to: /opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64
/opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64/bin/sonar-scanner -Dsonar.projectBaseDir=.
17:34:15.701 INFO Scanner configuration file: /opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64/conf/sonar-scanner.properties
17:34:15.704 INFO Project root configuration file: /home/runner/work/elzatona_web/elzatona_web/sonar-project.properties
17:34:15.720 INFO SonarScanner CLI 7.2.0.5079
17:34:15.722 INFO Linux 6.11.0-1018-azure amd64
17:34:16.435 INFO Communicating with SonarQube Cloud
17:34:16.436 INFO JRE provisioning: os[linux], arch[x86_64]
17:34:19.444 INFO Starting SonarScanner Engine...
17:34:19.445 INFO Java 17.0.11 Eclipse Adoptium (64-bit)
17:34:20.435 INFO Load global settings
17:34:21.042 INFO Load global settings (done) | time=609ms
17:34:21.100 INFO Server id: 1BD809FA-AWHW8ct9-T_TB3XqouNu
17:34:21.288 INFO Loading required plugins
17:34:21.290 INFO Load plugins index
17:34:21.412 INFO Load plugins index (done) | time=121ms
17:34:21.412 INFO Load/download plugins
17:34:22.145 INFO Load/download plugins (done) | time=734ms
17:34:22.356 INFO Loaded core extensions: architecture, sca, a3s
17:34:22.613 INFO Process project properties
17:34:22.626 INFO Project key: FoushWare_elzatona_web
17:34:22.628 INFO Base dir: /home/runner/work/elzatona_web/elzatona_web
17:34:22.629 INFO Working dir: /home/runner/work/elzatona_web/elzatona_web/.scannerwork
17:34:22.648 INFO Found an active CI vendor: 'Github Actions'
17:34:22.653 INFO Load project branches
17:34:22.755 INFO Load project branches (done) | time=103ms
17:34:22.761 INFO Load project settings for component key: 'FoushWare_elzatona_web'
17:34:23.219 INFO Check ALM binding of project 'FoushWare_elzatona_web'
17:34:23.325 INFO Detected project binding: NONEXISTENT
17:34:23.325 INFO Check ALM binding of project 'FoushWare_elzatona_web' (done) | time=106ms
17:34:23.327 INFO Load project pull requests
17:34:23.429 INFO Load project pull requests (done) | time=102ms
17:34:23.432 INFO Load branch configuration
17:34:23.433 INFO Github event: push
17:34:23.439 INFO Auto-configuring branch main
17:34:23.468 ERROR Could not find a default branch for project with key 'FoushWare_elzatona_web'. Make sure project exists.
17:34:23.794 INFO EXECUTION FAILURE
17:34:23.795 INFO Total time: 8.097s
Error: Action failed: The process '/opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64/bin/sonar-scanner' failed with exit code 3
0s
0s
0s
0s

# 2-sonarqube

Run SonarSource/sonarqube-scan-action@v6
Installing Sonar Scanner CLI 7.2.0.5079 for linux-x64...
Downloading from: https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-7.2.0.5079-linux-x64.zip
/usr/bin/unzip -o -q /home/runner/work/\_temp/c1e84d88-8215-46f5-ad47-6bc730da19a5
Sonar Scanner CLI cached to: /opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64
/opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64/bin/sonar-scanner -Dsonar.projectBaseDir=.
17:48:15.039 INFO Scanner configuration file: /opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64/conf/sonar-scanner.properties
17:48:15.042 INFO Project root configuration file: /home/runner/work/elzatona_web/elzatona_web/sonar-project.properties
17:48:15.057 INFO SonarScanner CLI 7.2.0.5079
17:48:15.059 INFO Linux 6.11.0-1018-azure amd64
17:48:15.740 INFO Communicating with SonarQube Cloud
17:48:15.741 INFO JRE provisioning: os[linux], arch[x86_64]
17:48:18.758 INFO Starting SonarScanner Engine...
17:48:18.759 INFO Java 17.0.11 Eclipse Adoptium (64-bit)
17:48:19.721 INFO Load global settings
17:48:20.513 INFO Load global settings (done) | time=794ms
17:48:20.575 INFO Server id: 1BD809FA-AWHW8ct9-T_TB3XqouNu
17:48:20.745 INFO Loading required plugins
17:48:20.745 INFO Load plugins index
17:48:20.897 INFO Load plugins index (done) | time=155ms
17:48:20.897 INFO Load/download plugins
17:48:21.812 INFO Load/download plugins (done) | time=915ms
17:48:22.045 INFO Loaded core extensions: sca, a3s, architecture
17:48:22.310 INFO Process project properties
17:48:22.322 INFO Project key: FoushWare_elzatona_web
17:48:22.326 INFO Base dir: /home/runner/work/elzatona_web/elzatona_web
17:48:22.327 INFO Working dir: /home/runner/work/elzatona_web/elzatona_web/.scannerwork
17:48:22.337 INFO Found an active CI vendor: 'Github Actions'
17:48:22.341 INFO Load project branches
17:48:22.478 INFO Load project branches (done) | time=137ms
17:48:22.482 INFO Load project settings for component key: 'FoushWare_elzatona_web'
17:48:23.010 INFO Check ALM binding of project 'FoushWare_elzatona_web'
17:48:23.147 INFO Detected project binding: NONEXISTENT
17:48:23.147 INFO Check ALM binding of project 'FoushWare_elzatona_web' (done) | time=136ms
17:48:23.149 INFO Load project pull requests
17:48:23.288 INFO Load project pull requests (done) | time=139ms
17:48:23.291 INFO Load branch configuration
17:48:23.292 INFO Github event: push
17:48:23.295 INFO Auto-configuring branch main
17:48:23.318 ERROR Could not find a default branch for project with key 'FoushWare_elzatona_web'. Make sure project exists.
17:48:23.644 INFO EXECUTION FAILURE
17:48:23.646 INFO Total time: 8.610s
Error: Action failed: The process '/opt/hostedtoolcache/sonar-scanner-cli/7.2.0.5079/linux-x64/bin/sonar-scanner' failed with exit code 3

# 3- formating

Run echo "🎨 Running Prettier formatting check..."
🎨 Running Prettier formatting check...
Checking formatting...
[warn] apps/website/network/routes/questions/bulk-topics/route.ts
[warn] Code style issues found in the above file. Run Prettier with --write to fix.
⚠️ Prettier found formatting issues. Run 'npm run format' to fix them.
Error: Process completed with exit code 1.

# 4- analyze

Skip to content
Navigation Menu
FoushWare
elzatona_web

Type / to search
Code
Issues
45
Pull requests
Discussions
Actions
Projects
Security
5,000+
Insights
Settings
CodeQL Analysis
Fix remaining vulnerabilities in apps/admin overrides #282
Jobs
Run details
Annotations
1 error and 2 warnings
Analyze (javascript)
failed 3 minutes ago in 3m 31s
Search logs
1s
3s
16s
0s
1m 5s
3s
1m 52s
[186/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/LanguageFeatures/SemicolonInsertion.qlx.
[187/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/LanguageFeatures/NonLinearPattern.qlx.
[188/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/LanguageFeatures/DeleteVar.qlx.
[189/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/LanguageFeatures/ForInComprehensionBlocks.qlx.
[190/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/LanguageFeatures/YieldInNonGenerator.qlx.
[191/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/UnreachableStatement.qlx.
[192/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/UselessComparisonTest.qlx.
[193/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/IgnoreArrayResult.qlx.
[194/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/UselessConditional.qlx.
[195/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/DanglingElse.qlx.
[196/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/SuspiciousUnusedLoopIterationVariable.qlx.
[197/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/LoopIterationSkippedDueToShifting.qlx.
[198/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/MisleadingIndentationAfterControlStmt.qlx.
[199/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/InconsistentLoopOrientation.qlx.
[200/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/UseOfReturnlessFunction.qlx.
[201/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/LabelInCase.qlx.
[202/202] Loaded /opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/qlpacks/codeql/javascript-queries/2.2.3/Statements/ReturnAssignsLocal.qlx.
Starting evaluation of codeql/javascript-queries/AngularJS/DependencyMismatch.ql.
Starting evaluation of codeql/javascript-queries/AngularJS/DisablingSce.ql.
[1/202 eval 4.3s] Evaluation done; writing results to codeql/javascript-queries/AngularJS/DependencyMismatch.bqrs.
Starting evaluation of codeql/javascript-queries/AngularJS/DoubleCompilation.ql.
Starting evaluation of codeql/javascript-queries/AngularJS/DuplicateDependency.ql.
[2/202 eval 114ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/DisablingSce.bqrs.
Starting evaluation of codeql/javascript-queries/AngularJS/IncompatibleService.ql.
[3/202 eval 2ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/DoubleCompilation.bqrs.
Starting evaluation of codeql/javascript-queries/AngularJS/InsecureUrlWhitelist.ql.
[4/202 eval 2ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/DuplicateDependency.bqrs.
Starting evaluation of codeql/javascript-queries/AngularJS/MissingExplicitInjection.ql.
Starting evaluation of codeql/javascript-queries/AngularJS/RepeatedInjection.ql.
Starting evaluation of codeql/javascript-queries/AngularJS/UseNgSrc.ql.
[5/202 eval 3ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/IncompatibleService.bqrs.
[6/202 eval 5ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/InsecureUrlWhitelist.bqrs.
[7/202 eval 5ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/MissingExplicitInjection.bqrs.
[8/202 eval 5ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/RepeatedInjection.bqrs.
[9/202 eval 7ms] Evaluation done; writing results to codeql/javascript-queries/AngularJS/UseNgSrc.bqrs.
Starting evaluation of codeql/javascript-queries/DOM/DuplicateAttributes.ql.
Starting evaluation of codeql/javascript-queries/DOM/MalformedIdAttribute.ql.
[10/202 eval 10.1s] Evaluation done; writing results to codeql/javascript-queries/DOM/DuplicateAttributes.bqrs.
Starting evaluation of codeql/javascript-queries/DOM/PseudoEval.ql.
[11/202 eval 33.3s] Evaluation done; writing results to codeql/javascript-queries/DOM/MalformedIdAttribute.bqrs.
Starting evaluation of codeql/javascript-queries/Declarations/ArgumentsRedefined.ql.
[12/202 eval 31ms] Evaluation done; writing results to codeql/javascript-queries/DOM/PseudoEval.bqrs.
Starting evaluation of codeql/javascript-queries/Declarations/AssignmentToConst.ql.
[13/202 eval 15ms] Evaluation done; writing results to codeql/javascript-queries/Declarations/ArgumentsRedefined.bqrs.
Starting evaluation of codeql/javascript-queries/Declarations/ClobberingVarInit.ql.
[14/202 eval 499ms] Evaluation done; writing results to codeql/javascript-queries/Declarations/AssignmentToConst.bqrs.
Starting evaluation of codeql/javascript-queries/Declarations/ConflictingFunctions.ql.
[15/202 eval 481ms] Evaluation done; writing results to codeql/javascript-queries/Declarations/ClobberingVarInit.bqrs.
Starting evaluation of codeql/javascript-queries/Declarations/DeadStoreOfLocal.ql.
[16/202 eval 975ms] Evaluation done; writing results to codeql/javascript-queries/Declarations/ConflictingFunctions.bqrs.
Error: Error running analysis for javascript: Encountered a fatal error while running "/opt/hostedtoolcache/CodeQL/2.23.8/x64/codeql/codeql database run-queries --ram=1024 --threads=1 --expect-discarded-cache /home/runner/work/\_temp/codeql_databases/javascript --min-disk-free=1024 -v". Exit code was 99 and last log line was: [16/202 eval 975ms] Evaluation done; writing results to codeql/javascript-queries/Declarations/ConflictingFunctions.bqrs. See the logs for more details.
1s
0s
8s
1s
0s

5- i see security scan failed and have more than 50000 alerts
https://github.com/FoushWare/elzatona_web/security
