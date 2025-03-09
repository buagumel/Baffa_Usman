<?php
  
require_once '../assets/vendor/php-email-form/php-email-form.php';

// Replace with your real receiving email address
$receiving_email_address = 'buagumel@gmail.com';

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

// Use SMTP (Requires App Password for Gmail)
$contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => 'baffausman247@gmail.com',
    'password' => 'kepuzsuvuhhveweb', // Replace with a Gmail App Password
    'port' => '587'
);

$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

echo $contact->send();
?>
