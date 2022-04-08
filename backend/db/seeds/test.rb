if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'Test Client', redirect_uri: '', scopes: '')

end
