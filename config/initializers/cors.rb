Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins *Account.active.map(&:domain).map(&:strip)
    resource "*", headers: :any, methods: [:get, :post, :patch, :put]
  end
end