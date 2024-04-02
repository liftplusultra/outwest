class SendSms
  include Interactor
  # IN
  # message: the message string
  # to: +1phonenumber
  # OUT
  # message: twilio message
  #
  def call
    sid = ENV.fetch("TWILIO_ACCOUNT_SID")
    token = ENV.fetch("TWILIO_AUTH_TOKEN")
    from = ENV.fetch("TWILIO_PHONE")
    client = Twilio::REST::Client.new(sid, token)

    context.message = client.messages.create(
      body: context.message,
      to: formatted_to,
      from: from
    )

  rescue => e
    Rails.logger.debug "------------ Error sending SMS ------------"
    Rails.logger.debug e.message
    Rails.logger.debug e.backtrace
  end

  private

  def formatted_to
    # Ensure +1 and phone formatting
    context.to
  end
end