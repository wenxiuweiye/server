// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const SmsClient = tencentcloud.sms.v20210111.Client;

const clientConfig = {
  credential: {
    secretId: "AKIDRluraEuMceU6VkrqdFertiLuWv7DAuZI",
    secretKey: "nOltsgJl5GIAuZ6TltvnX6TgpojYEk4C",
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "sms.tencentcloudapi.com",
    },
  },
};

const client = new SmsClient(clientConfig);
// const params = {
//     "PhoneNumberSet": [
//         "+8618783228521"
//     ],
//     "SmsSdkAppId": "1400700256",
//     "TemplateId": "1459670",
//     "SignName":"柠萌网",
//     "TemplateParamSet":["250","2"]
// };
// client.SendSms(params).then(
//   (data) => {
//     console.log(data);
//   },
//   (err) => {
//     console.error("error", err);
//   }
// );

module.exports = client