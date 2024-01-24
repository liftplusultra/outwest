Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    #TODO update to use a cached list of allowed origins.
    origins "*"
    resource "*", headers: :any, methods: [:get, :post, :patch, :put]
  end
end