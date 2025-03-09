<?php

class PHP_Email_Form {
    public $to = '';
    public $from_name = '';
    public $from_email = '';
    public $subject = '';
    public $message = '';
    public $headers = '';

    public function add_message($content, $label = '') {
        $this->message .= "$label: $content\n";
    }

    public function send() {
        if (!$this->to || !$this->from_email || !$this->subject || !$this->message) {
            return "Error: Missing required fields!";
        }

        $this->headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
        $this->headers .= "Reply-To: " . $this->from_email . "\r\n";
        $this->headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($this->to, $this->subject, $this->message, $this->headers)) {
            return "Message sent successfully!";
        } else {
            return "Error: Unable to send the email.";
        }
    }
}
?>
