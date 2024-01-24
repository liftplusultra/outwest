class Api::ContactsController < Api::ApplicationController
  def create
    # TODO update to include capture of failed captchas for analytics
    current_account.contacts.create(contacts_params) if verify_recaptcha
    render json: {status: "ok"}, status: :created
  end

  private

  def contacts_params
    params.permit(:name, :phone_or_email, :message)
  end
end