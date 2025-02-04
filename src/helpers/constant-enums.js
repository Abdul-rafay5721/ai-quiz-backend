const USER_ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    USER: 'USER',
    ADMIN: 'ADMIN',
    DISPATCHER: 'DISPATCHER',
    INSPECTOR: 'INSPECTOR',
    DRIVER: 'DRIVER',
    APPROVER: 'APPROVER'
};

const PLATFORMS = {
    FACEBOOK: 'FACEBOOK',
    GMAIL: 'GMAIL',
    APPLE: 'APPLE',
    EMAIL: 'EMAIL',
    PHONE: 'PHONE'
};

const AUTHTYPE = {
    SEED: 'SEED',
    GMAIL: 'GMAIL',
    APPLE: 'APPLE'
};

const QUESTIONTYPE = {
    SINGLE: 'SINGLE_CHOICE',
    MULTIPLE: 'MULTIPLE_CHOICE',
    TEXT: 'TEXT',
    SCALE: 'SCALE'
};

const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
};

const INPUT_TYPE = {
    TEXT: 'TEXT',
    CHECKBOX: 'CHECKBOX',
    SELECT: 'SELECT',
    RADIO: 'RADIO',
    NUMBER: 'NUMBER'
};

const NOTIFICATION_TYPES = {
    PROJECT: 'PROJECT',
    DISPATCH: 'DISPATCH',
    INSPECTION: 'INSPECTION',
    APPROVE: 'APPROVE'
};

const STATUSES = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REBER_STOP: 'INSPECTION',
    PROGRESS: 'PROGRESS',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED',
    REQUESTED: 'REQUESTED',
    REJECT: 'REJECT'
};

const INSPECTION_TYPES = {
    BATCH_PLANT: 'BATCH_PLANT',
    STEEL_FABRICATION: 'STEEL_FABRICATION',
    REBER_STOP: 'REBER_STOP',
    OTHER: 'OTHER'
};

const EVENT_TYPES = {
    DAILY_DEVOTIONAL: 'Daily Devotionals',
    CHURCH_EVENTS: 'Church Events',
    FASTING_AND_PRAYER_DAYS: 'Fasting and Prayer Days',
    LITURGICAL_CALENDER: 'Liturgical Calendar',
    BIRTHDAY_AND_ANNIVERSARIES: 'Birthdays and Anniversaries',
    BAPTISM_ANNIVERSARIES: 'Baptism Anniversaries',
    WEDDING_ANNIVERSARIES: 'Wedding Anniversaries',
    GOAL_TRACKING: 'Goal Tracking',
    CONFERENCES_AND_RETREATS: 'Conferences and Retreats',
    SPIRITUAL_CHECK_INS: 'Spiritual Check-Ins',
    MEMORIAL_DAYS: 'Memorial Days'
}
const DIFFICULT_LEVEL = {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD'
};

Object.freeze(USER_ROLE);
Object.freeze(PLATFORMS);
Object.freeze(GENDER);
Object.freeze(INPUT_TYPE);
Object.freeze(NOTIFICATION_TYPES);
Object.freeze(STATUSES);
Object.freeze(INSPECTION_TYPES);
Object.freeze(AUTHTYPE);
Object.freeze(DIFFICULT_LEVEL);

const CONSTANT_ENUM = {
    USER_ROLE,
    PLATFORMS,
    GENDER,
    INPUT_TYPE,
    NOTIFICATION_TYPES,
    STATUSES,
    INSPECTION_TYPES,
    AUTHTYPE,
    QUESTIONTYPE,
    EVENT_TYPES,
    DIFFICULT_LEVEL
};

module.exports = CONSTANT_ENUM;
