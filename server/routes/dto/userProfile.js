const UserProfileRouterDTO = {};

UserProfileRouterDTO.createUser = (request) => {
    console.info(`Inside UserProfileRouterDTO.createUser where request = ${JSON.stringify(request)}`);
    return {
        phoneNumber: request.phoneNumber,
        userName: request.userName?.trim(),
        accountType: request.accountType,
        dob: request.dob,
        state: request.state,
        pincode: request.pincode,
        idType: request.idType,
        idNumber: request.idNumber,
        customerId: request.customerId
    };
}

UserProfileRouterDTO.createUserProfile = (request) => {
    console.info(`Inside UserProfileRouterDTO.createUserProfile where request = ${JSON.stringify(request)}`);
    return {
        phoneNumber: request.phoneNumber,
        userName: request.userName?.trim()
    };
}

UserProfileRouterDTO.getUserDetails = (request) => {
    console.info(`Inside UserProfileRouterDTO.getUserDetails where request = ${JSON.stringify(request)}`);
    return request.customerId
}

UserProfileRouterDTO.getAccountsByBranchId = (request) => {
    console.info(`Inside UserProfileRouterDTO.getAccountsByBranchId where request = ${JSON.stringify(request)}`);
    return request.branchId
}

UserProfileRouterDTO.getUserDetailsByNumber = (request) => {
    console.info(`Inside UserProfileRouterDTO.getUserDetailsByNumber where request = ${JSON.stringify(request)}`);
    return request.phoneNumber
}

export default UserProfileRouterDTO;