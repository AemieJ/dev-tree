import service from '../services/index.js';

export const getBookmarks = async ({ email, accessToken }) => {
    const value = await service.fetchBookMarks(email, accessToken);
    return value.msg;
};

export const insertBookMark = async ({ userEmail, email, accessToken }) => {
    const value = await service.insertBookMarks(userEmail, email, accessToken);
    return value.msg;
};

export const removeBookMark = async ({ userEmail, email, accessToken }) => {
    const value = await service.removeBookMarks(userEmail, email, accessToken);
    return value.msg;
}