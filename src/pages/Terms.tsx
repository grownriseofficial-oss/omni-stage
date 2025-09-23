import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: January 1, 2024</span>
              </div>
              <Badge variant="outline">Version 2.1</Badge>
            </div>
          </div>

          {/* Terms Content */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Legal Terms and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using this CRM service ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-muted-foreground">
                  These Terms of Service ("Terms") govern your use of our CRM platform and services provided by our company.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground mb-4">
                  Our CRM platform provides customer relationship management tools including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Contact and lead management</li>
                  <li>Sales pipeline tracking</li>
                  <li>Email automation and marketing</li>
                  <li>Analytics and reporting</li>
                  <li>Team collaboration features</li>
                  <li>Third-party integrations</li>
                </ul>
                <p className="text-muted-foreground">
                  The Service is provided "as is" and we reserve the right to modify, suspend, or discontinue any aspect of the Service at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts and Registration</h2>
                <p className="text-muted-foreground mb-4">
                  To access certain features of the Service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your information to keep it accurate and current</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <p className="text-muted-foreground">
                  You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
                <p className="text-muted-foreground mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Upload, post, or transmit any content that is illegal, harmful, or violates third-party rights</li>
                  <li>Spam, harass, or send unsolicited communications</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Attempt to gain unauthorized access to any portion of the Service</li>
                  <li>Use the Service for any commercial purpose without authorization</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data and Privacy</h2>
                <p className="text-muted-foreground mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p className="text-muted-foreground mb-4">
                  You retain ownership of your data. We will not access, use, or disclose your data except as necessary to provide the Service or as required by law.
                </p>
                <p className="text-muted-foreground">
                  You are responsible for maintaining regular backups of your data. We provide backup services but recommend maintaining your own copies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Payment and Billing</h2>
                <p className="text-muted-foreground mb-4">
                  Paid services are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as specifically stated in these Terms.
                </p>
                <p className="text-muted-foreground mb-4">
                  We may change our pricing at any time. For paid services, price changes will take effect at the start of the next billing cycle.
                </p>
                <p className="text-muted-foreground">
                  Failure to pay fees when due may result in suspension or termination of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-muted-foreground">
                  You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
                <p className="text-muted-foreground mb-4">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.
                </p>
                <p className="text-muted-foreground mb-4">
                  Upon termination, your right to use the Service will cease immediately. All provisions that should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
                </p>
                <p className="text-muted-foreground">
                  You may terminate your account at any time by contacting us. Upon termination, we will provide you with access to export your data for a reasonable period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Disclaimers and Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  The Service is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
                </p>
                <p className="text-muted-foreground mb-4">
                  In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business interruption.
                </p>
                <p className="text-muted-foreground">
                  Our total liability to you for any claim arising from these Terms or the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to indemnify and hold us harmless from any claims, damages, liabilities, costs, and expenses arising from your use of the Service, your violation of these Terms, or your violation of any rights of another.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of [Jurisdiction].
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by email or through the Service.
                </p>
                <p className="text-muted-foreground">
                  Your continued use of the Service after changes to the Terms constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2">Email: legal@crmplatform.com</p>
                  <p className="text-muted-foreground mb-2">Address: 123 Business Street, Suite 100, City, State 12345</p>
                  <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;