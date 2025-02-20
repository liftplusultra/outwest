class PagesController < ApplicationController
  def index
    @posts = Post.with_all_rich_text.preload(:tags).published.featured
  end

  def about
  end

  def custom_software_development
  end

  def software_integrations
  end

  def mobile_app_development
  end

  def strategy_consulting
  end

  def business_analytics
  end

  def operations_consulting
  end

  def protection_for_seniors

  end
end
