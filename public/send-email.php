<?php
header("Access-Control-Allow-Origin: https://wtube.co");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$firstName   = htmlspecialchars($data['firstName'] ?? '');
$secondName  = htmlspecialchars($data['secondName'] ?? '');
$email       = htmlspecialchars($data['email'] ?? '');
$mobile      = htmlspecialchars($data['mobile'] ?? '');
$description = htmlspecialchars($data['description'] ?? '');

if (!$firstName || !$email || !$description) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$to      = "shubhampersia512@gmail.com";
$subject = "New Enquiry from $firstName $secondName";

$htmlBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background-color: #111111; padding: 24px 32px; }
    .header h1 { color: #FFC107; margin: 0; font-size: 22px; letter-spacing: 0.5px; }
    .header p { color: #aaaaaa; margin: 4px 0 0; font-size: 13px; }
    .body { padding: 32px; }
    .body h2 { color: #111111; font-size: 16px; margin: 0 0 20px; border-bottom: 2px solid #FFC107; padding-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 12px 16px; font-size: 14px; color: #333333; }
    tr:nth-child(odd) td { background-color: #f9f9f9; }
    tr:nth-child(even) td { background-color: #ffffff; }
    .label { font-weight: bold; color: #111111; width: 140px; }
    .message-box { background-color: #f9f9f9; border-left: 4px solid #FFC107; padding: 16px; margin-top: 24px; border-radius: 4px; font-size: 14px; color: #333333; line-height: 1.6; }
    .message-box strong { display: block; margin-bottom: 8px; color: #111111; }
    .footer { background-color: #f4f4f4; padding: 16px 32px; text-align: center; font-size: 12px; color: #999999; }
    .footer a { color: #FFC107; text-decoration: none; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>Wolverine</h1>
      <p>New Enquiry Received</p>
    </div>
    <div class='body'>
      <h2>Enquiry Details</h2>
      <table>
        <tr>
          <td class='label'>Name:</td>
          <td>$firstName $secondName</td>
        </tr>
        <tr>
          <td class='label'>Email:</td>
          <td><a href='mailto:$email' style='color:#FFC107;'>$email</a></td>
        </tr>
        <tr>
          <td class='label'>Mobile:</td>
          <td>$mobile</td>
        </tr>
      </table>
      <div class='message-box'>
        <strong>Message:</strong>
        $description
      </div>
    </div>
    <div class='footer'>
      This email was sent via the enquiry form at <a href='https://wtube.co'>wtube.co</a>
    </div>
  </div>
</body>
</html>
";

$headers  = "From: noreply@michmfg.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

if (mail($to, $subject, $htmlBody, $headers)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Mail failed"]);
}
?>
