class Api::ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :verify_authorized!

  def current_account
    @current_account ||= Account.active.find_by(domain: request.domain, public_token: request.headers["X-Public-Token"])
  end
  helper_method :current_account

  private

  def verify_authorized!
    render json: {error: "Forbidden"}, status: :forbidden unless current_account.present?
  end
end