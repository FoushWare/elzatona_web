const fs = require('fs');
const path = require('path');

// Define the transformation function
function transformSecurityQuestions() {
  console.log('🔄 Starting transformation of security questions...');

  const securityDir = path.join(__dirname, '../data/json/security');
  const files = fs
    .readdirSync(securityDir)
    .filter(file => file.endsWith('.json'));

  console.log(`Found ${files.length} security files to transform:`);
  files.forEach(file => console.log(`  - ${file}`));

  let totalTransformedQuestions = 0;

  files.forEach(file => {
    const filePath = path.join(securityDir, file);
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const questions = JSON.parse(fileContent);

      const transformedQuestions = questions.map((question, index) => {
        // Generate consistent ID based on file and index
        const fileBaseName = file.replace('.json', '');
        const newId = `${fileBaseName}-${question.id}`;

        // Map topics based on subcategory or topic
        const topicMap = {
          XSS: 'Cross-Site Scripting (XSS)',
          CSRF: 'Cross-Site Request Forgery (CSRF)',
          Authentication: 'Authentication & Authorization',
          Authorization: 'Authentication & Authorization',
          HTTPS: 'HTTPS & SSL/TLS',
          SSL: 'HTTPS & SSL/TLS',
          TLS: 'HTTPS & SSL/TLS',
          CORS: 'Cross-Origin Resource Sharing (CORS)',
          CSP: 'Content Security Policy (CSP)',
          OWASP: 'OWASP Top 10',
          Injection: 'Injection Attacks',
          'SQL Injection': 'Injection Attacks',
          'NoSQL Injection': 'Injection Attacks',
          'Session Management': 'Session Management',
          Cookies: 'Session Management',
          JWT: 'JSON Web Tokens (JWT)',
          OAuth: 'OAuth & OpenID Connect',
          OpenID: 'OAuth & OpenID Connect',
          'API Security': 'API Security',
          'Rate Limiting': 'API Security',
          'Input Validation': 'Input Validation & Sanitization',
          Sanitization: 'Input Validation & Sanitization',
          Encryption: 'Encryption & Hashing',
          Hashing: 'Encryption & Hashing',
          'Password Security': 'Password Security',
          'Vulnerability Assessment': 'Vulnerability Assessment',
          'Penetration Testing': 'Penetration Testing',
          'Security Headers': 'Security Headers',
          SameSite: 'Security Headers',
          'Secure Flag': 'Security Headers',
          HttpOnly: 'Security Headers',
          Clickjacking: 'Clickjacking',
          'File Upload': 'File Upload Security',
          'Directory Traversal': 'Directory Traversal',
          'Path Traversal': 'Directory Traversal',
          XXE: 'XML External Entity (XXE)',
          XML: 'XML External Entity (XXE)',
          Deserialization: 'Deserialization Attacks',
          Serialization: 'Deserialization Attacks',
          'Buffer Overflow': 'Buffer Overflow',
          'Memory Management': 'Memory Management',
          'Race Conditions': 'Race Conditions',
          'Time-based Attacks': 'Time-based Attacks',
          'Side-channel': 'Side-channel Attacks',
          'Timing Attacks': 'Timing Attacks',
          Cryptography: 'Cryptography',
          'Digital Signatures': 'Digital Signatures',
          Certificate: 'Digital Certificates',
          PKI: 'Public Key Infrastructure (PKI)',
          'Key Management': 'Key Management',
          'Secrets Management': 'Secrets Management',
          'Environment Variables': 'Secrets Management',
          Configuration: 'Security Configuration',
          Hardening: 'Security Hardening',
          Compliance: 'Security Compliance',
          GDPR: 'Security Compliance',
          'PCI DSS': 'Security Compliance',
          HIPAA: 'Security Compliance',
          SOX: 'Security Compliance',
          Audit: 'Security Auditing',
          Logging: 'Security Logging',
          Monitoring: 'Security Monitoring',
          'Incident Response': 'Incident Response',
          Forensics: 'Digital Forensics',
          Malware: 'Malware Analysis',
          'Threat Modeling': 'Threat Modeling',
          'Risk Assessment': 'Risk Assessment',
          'Security Architecture': 'Security Architecture',
          'Zero Trust': 'Zero Trust Architecture',
          'Microservices Security': 'Microservices Security',
          'Container Security': 'Container Security',
          'Docker Security': 'Container Security',
          'Kubernetes Security': 'Container Security',
          'Cloud Security': 'Cloud Security',
          'AWS Security': 'Cloud Security',
          'Azure Security': 'Cloud Security',
          'GCP Security': 'Cloud Security',
          DevSecOps: 'DevSecOps',
          SAST: 'Static Application Security Testing (SAST)',
          DAST: 'Dynamic Application Security Testing (DAST)',
          IAST: 'Interactive Application Security Testing (IAST)',
          SCA: 'Software Composition Analysis (SCA)',
          'Dependency Scanning': 'Dependency Scanning',
          'Vulnerability Scanning': 'Vulnerability Scanning',
          'Security Testing': 'Security Testing',
          'Bug Bounty': 'Bug Bounty Programs',
          'Responsible Disclosure': 'Responsible Disclosure',
          'Security Awareness': 'Security Awareness',
          Training: 'Security Training',
          Phishing: 'Social Engineering',
          'Social Engineering': 'Social Engineering',
          'Insider Threats': 'Insider Threats',
          'Data Breach': 'Data Breach Response',
          Privacy: 'Privacy Protection',
          'Data Protection': 'Data Protection',
          Anonymization: 'Data Anonymization',
          Pseudonymization: 'Data Pseudonymization',
          Consent: 'Consent Management',
          'Data Retention': 'Data Retention',
          'Data Minimization': 'Data Minimization',
          'Purpose Limitation': 'Purpose Limitation',
          Transparency: 'Transparency',
          Accountability: 'Accountability',
          'Data Subject Rights': 'Data Subject Rights',
          'Right to Access': 'Data Subject Rights',
          'Right to Rectification': 'Data Subject Rights',
          'Right to Erasure': 'Data Subject Rights',
          'Right to Portability': 'Data Subject Rights',
          'Right to Object': 'Data Subject Rights',
          'Automated Decision Making': 'Automated Decision Making',
          Profiling: 'Profiling',
          'Cross-border Transfer': 'Cross-border Data Transfer',
          'Adequacy Decision': 'Adequacy Decision',
          'Standard Contractual Clauses': 'Standard Contractual Clauses',
          'Binding Corporate Rules': 'Binding Corporate Rules',
          Certification: 'Certification',
          'Codes of Conduct': 'Codes of Conduct',
          'Data Protection Impact Assessment':
            'Data Protection Impact Assessment',
          DPIA: 'Data Protection Impact Assessment',
          'Legitimate Interest': 'Legitimate Interest',
          Consent: 'Consent',
          Contract: 'Contract',
          'Legal Obligation': 'Legal Obligation',
          'Vital Interests': 'Vital Interests',
          'Public Task': 'Public Task',
          'Special Categories': 'Special Categories of Data',
          'Biometric Data': 'Biometric Data',
          'Health Data': 'Health Data',
          'Financial Data': 'Financial Data',
          'Location Data': 'Location Data',
          'Behavioral Data': 'Behavioral Data',
          "Children's Data": "Children's Data",
          'Criminal Data': 'Criminal Data',
          'Political Data': 'Political Data',
          'Religious Data': 'Religious Data',
          'Philosophical Data': 'Philosophical Data',
          'Trade Union Data': 'Trade Union Data',
          'Sexual Data': 'Sexual Data',
          'Ethnic Data': 'Ethnic Data',
          'Racial Data': 'Racial Data',
          'Genetic Data': 'Genetic Data',
        };

        const topic =
          topicMap[question.subcategory] ||
          topicMap[question.topic] ||
          'Web Security Fundamentals';

        // Generate explanation from sampleAnswers or create default
        let explanation = question.explanation;
        if (
          !explanation &&
          question.sampleAnswers &&
          question.sampleAnswers.length > 0
        ) {
          explanation = question.sampleAnswers.join(' ');
        }
        if (!explanation && question.options) {
          const correctOption = question.options.find(opt => opt.isCorrect);
          explanation = correctOption
            ? `The correct answer is: ${correctOption.text}`
            : 'No explanation provided.';
        }
        if (!explanation) {
          explanation = 'No explanation provided.';
        }

        // Generate tags
        const tags = [
          'security',
          topic.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''),
        ];
        if (question.subcategory) {
          tags.push(question.subcategory.toLowerCase());
        }
        if (question.difficulty) {
          tags.push(question.difficulty);
        }

        return {
          id: newId,
          title: question.title,
          content: question.content,
          type: question.type,
          category: 'Security',
          topic: topic,
          difficulty: question.difficulty || 'intermediate',
          learningCardId: 'system-design', // Security questions belong to system-design card
          isActive: question.isActive !== undefined ? question.isActive : true,
          createdAt: question.createdAt || new Date().toISOString(),
          updatedAt: question.updatedAt || new Date().toISOString(),
          createdBy: question.createdBy || 'admin',
          updatedBy: question.updatedBy || 'admin',
          tags: tags,
          explanation: explanation,
          points: question.points || 10,
          options: question.options?.map(opt => ({
            ...opt,
            explanation: opt.explanation || '',
          })),
          sampleAnswers: question.sampleAnswers,
          subcategory: question.subcategory, // Keep subcategory for reference
          hints: question.hints || [],
          timeLimit: question.timeLimit,
          metadata: question.metadata || {},
        };
      });

      fs.writeFileSync(
        filePath,
        JSON.stringify(transformedQuestions, null, 2),
        'utf-8'
      );
      console.log(
        `✅ Transformed ${file}: ${transformedQuestions.length} questions`
      );
      totalTransformedQuestions += transformedQuestions.length;
    } catch (error) {
      console.error(`❌ Error transforming ${filePath}:`, error);
    }
  });

  console.log('\n🎉 Transformation complete!');
  console.log(`📊 Total questions transformed: ${totalTransformedQuestions}`);
  console.log(`📁 Files processed: ${files.length}`);

  // Verify JSON validity
  console.log('\n🔍 Verifying JSON validity...');
  files.forEach(file => {
    const filePath = path.join(securityDir, file);
    try {
      JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(`✅ ${file} - Valid JSON`);
    } catch (error) {
      console.error(`❌ ${file} - Invalid JSON:`, error);
    }
  });
}

// Run the transformation
transformSecurityQuestions();
