const quizQuestions = [
    {
        question: 'Member Organization should ensure registration for each phone number (or) National ID/Iqama, is linked to one application only.'
    },
    {
        question: 'Member Organization should establish a secure process to validate users.'
    },
    {
        question:
            'The registration process should include the following: a. For lending platforms: Strong form of authentication from an independent trusted party. b. For E-wallet platforms: Strong form of authentication from an independent trusted party i.e. (National Single Sign-On (NSSO)) by using user name, password, and OTP. c. For other business model, robust controls should be implemented in the registration/onboarding process taking into considerations the concept mentioned in points (3.3.a-b).'
    },

    {
        question: 'Member Organization should verify that the ownership of the phone number is registered to the same user (i.e. match name & national ID) through trusted party only (i.e. Tahaqaq).'
    },
    {
        question:
            'Member Organization should ensure the registration process includes one-time-password mechanism (OTP) as a form of verification. The (OTP) must be send to a verified phone number as per point (3.4).'
    },
    {
        question: 'Member organizations should implement session timeout controls for all issued (OTP)s.'
    },
    {
        question: 'SMS notification should be sent to the users for registration, device re-registration or change in the status of account such as deactivation, reactivation and inactive.'
    },
    {
        question: 'Member Organization application should be assigned to one device only. Otherwise, an (OTP) should be implemented for each login, as well as disabling concurrent login.'
    },
    {
        question: 'Member Organization should develop effective and secure process for account deactivation, reactivation and device re registration to authenticate the user.'
    },
    {
        question: 'Member organization should implement regulatory SAMA cybersecurity requirements.'
    },
    {
        question: 'Member Organization should use official application stores.'
    },
    {
        question:
            'Member Organization should develop installation restriction mechanism for privilege escalation devices such as “Jailbreak” for iOS and “Root” for Android or any open source operating system, taking into consideration that the application is installed through official stores.'
    },
    {
        question: 'Member organization should have contingency measures in case of disaster and ensure effective back-up and recovery procedures'
    },
    {
        question: 'Terms & Conditions should cover data privacy taking into consideration customer consent to display name of account owner.'
    },
    {
        question:
            'Member Organization should conduct awareness program to \nall users on regular basis that should cover Terms & Conditions and general security awareness such as sharing confidential \ninformation (password or OTP).'
    },
    {
        question: 'Member Organization should develop inactive accounts policy.'
    },
    {
        question: 'Multi Factor Authentication (MFA) should be implemented to authenticate each log in.'
    },
    {
        question:
            'One-time-password mechanism (OTP) should be implemented for the following processes: a.Transfer between wallet to wallet (for the first time as minimum for each beneficiary) below (Defined Value). b. Making any application marketplace transaction. c.Payment of bills, utility and government services (for the first time as minimum for each bills). d. Password reset. e.Wallets reactivations. f.Risky transactions based on company assessment and use cases.'
    },

    {
        'Question no': '4.10.',
        question:
            'One Time Password in one channel and using different delivery channel should be used for following transactions: a.Any transaction between wallets exceeding (Defined Value) as a daily limit (for first time as minimum for each beneficiary). b.Transfer to IBAN (for first time as minimum for each beneficiary). c.international transfer (for first time as minimum for each beneficiary). d.High risk transactions based on company assessment and use cases',
        '': ''
    },

    {
        question: 'SMS notification should be sent to users for all transactions and user account changes.'
    },
    {
        question: 'Member Organization should consider the use of comprehensive use cases and scenarios tailored for their business model to combat fraud; including but not limited to:'
    },
    {
        question: 'a.Monitoring the behavior of all users to detect any anomalies based on best practices. b.Managing device usage behavior'
    },
    {
        question: 'Member Organization should establish process to handle fraud cases taking into the consideration investigation and deactivation accounts steps.'
    },
    {
        question: 'Member Organization should develop a process to safeguard “Data Privacy” and “Data Security” of these accounts. Such information includes “Displaying name of account owner”.'
    },
    {
        question: 'Member Organization should ensure the content of the SMS messages is clear, direct, stating the purpose for the SMS and the name of the Member Organization'
    },
    {
        question:
            'Member Organizations should reflect all controls within this document within their board approved internal policies in their respective organizations, and should have a process in place for periodic review of the polices.'
    },
    {
        question: 'Lending Application Special Controls:'
    },
    {
        question: 'Member Organization should have process implemented to assure the recipient IBAN belongs to the loan requester.'
    },
    {
        question: 'Member Organization should use a trusted and authorized digital signature provider.'
    },
    {
        question: 'Ensure a process is implemented to securely create, save and manage promissory note by using national trusted party (e.g. Nafith)'
    },
    {
        question: 'Member Organization should implement a process to call the customer to confirm the loan request.'
    },
    {
        question: 'SMS notification should be sent with customer when: a.User submitted the request. b.When the loan request is approved or denied.'
    }
];

module.exports = quizQuestions;
