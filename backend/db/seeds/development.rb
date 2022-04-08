if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'Web Client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create!(name: 'iOS Client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create!(name: 'Android Client', redirect_uri: '', scopes: '')
  Doorkeeper::Application.create!(name: 'React', redirect_uri: '', scopes: '')
end

User.first_or_create(email: 'dean@example.com',
                     password: 'password',
                     password_confirmation: 'password',
                     role: User.roles[:admin])
