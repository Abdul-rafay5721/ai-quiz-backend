
 const formatReferralCode = (referralCode) => {
    // Convert the referral code to a string
    referralCode = String(referralCode);

    // Check if referral code is a number and has at most 9 digits
    if (!/^\d{1,9}$/.test(referralCode)) {
        throw new Error("Invalid referral code. It must be a numeric value with up to 9 digits.");
    }

    // Pad with leading zeroes to make it 9 digits
    const formattedCode = referralCode.padStart(9, '0');

    return formattedCode;
};


module.exports = formatReferralCode;

