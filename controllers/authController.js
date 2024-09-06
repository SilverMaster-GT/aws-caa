const { AWS, AmazonCognitoIdentity, userPool } = require('../models/cognitoModels');

exports.confirmNewPassword = (username, newPassword, session, userAttributes) => {
  return new Promise((resolve, reject) => {
    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.Session = session;

    cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
        onSuccess: function (result) {
            res.json({
                message: 'Password changed successfully',
                accessToken: result.getAccessToken().getJwtToken(),
                idToken: result.getIdToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken()
            });
        },
        onFailure: function (err) {
          resolve.status(400).json({ error: err.message });
        }
    });
  });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            res.json({ message: 'Login successful', tokens: result });
        },
        onFailure: function (err) {
            res.status(400).json({ error: err.message });
        },
        newPasswordRequired: async function(result, userAttributes, requiredAttributes) {
            try {
              const response = await exports.confirmNewPassword(username, "Allied+2024", cognitoUser.Session, userAttributes )
              res.json({ 
                  message: 'New password required',
                  userAttributes, 
                  requiredAttributes, 
                  session: cognitoUser.Session,
                  message2: 'se ejecuto el cambio de contraseña, su nueva contraseña es Allied+2024',
                  response
              });
            } catch (err) {
              res.status(400).json({ error: err.message });
          }
        }
    });
};

exports.changePassword = (req, res) => {
    const { accessToken, previousPassword, proposedPassword } = req.body;

    const params = {
        AccessToken: accessToken,
        PreviousPassword: previousPassword,
        ProposedPassword: proposedPassword,
    };

    const cognito = new AWS.CognitoIdentityServiceProvider();

    cognito.changePassword(params, (err, data) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'Password changed successfully' });
        }
    });
};

exports.forgotPassword = (req, res) => {
    const { username } = req.body;

    const params = {
        ClientId: process.env.CLIENT_ID,
        Username: username,
    };

    const cognito = new AWS.CognitoIdentityServiceProvider();

    cognito.forgotPassword(params, (err, data) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'Verification code sent', data });
        }
    });
};

exports.confirmForgotPassword = (req, res) => {
    const { username, confirmationCode, newPassword } = req.body;

    const params = {
        ClientId: process.env.CLIENT_ID,
        Username: username,
        ConfirmationCode: confirmationCode,
        Password: newPassword,
    };

    const cognito = new AWS.CognitoIdentityServiceProvider();

    cognito.confirmForgotPassword(params, (err, data) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: 'Password reset successful', data });
        }
    });
};
