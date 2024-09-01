class ApplicationController < ActionController::Base
  add_flash_types :success

  def render_turbo_flashes!
    render turbo_stream: turbo_stream.update("toasts", partial: "layouts/toasts")
  end
end
