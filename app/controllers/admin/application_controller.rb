class Admin::ApplicationController < ActionController::Base
  add_flash_types :success

  before_action :verify_current_admin!

  def render_turbo_flashes!
    render turbo_stream: turbo_stream.update("toasts", partial: "layouts/toasts")
  end

  def current_admin_user
    @admin_user ||= AdminUser.find_by(id: session[:admin_user_id])
  end
  helper_method :current_admin_user

  def super_admin?
    current_admin_user&.email == "forrest@outwesttech.com"
  end
  helper_method :super_admin?

  private

  def verify_current_admin!
    redirect_to new_admin_session_path, notice: "Please sign in." unless current_admin_user.present?
  end
end