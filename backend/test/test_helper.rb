ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'helpers/doorkeeper_params'

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
  include Helpers::DoorkeeperParams
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  include Devise::Test::IntegrationHelpers
  def api_sign_in(user)
    Doorkeeper::AccessToken.new(resource_owner_id: user.id)
  end

  def api_sign_out
    ApplicationController.any_instance.unstub(:doorkeeper_token)
  end

  def api_sign_up(email, password, client_id)
    uri = URI('http://localhost:3000/api/v1/users')
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.path)
    request.set_form_data(
      {
        'email' => email,
        'password' => password,
        'client_id' => client_id
      }
    )
    http.request(request)
  end

  # Add more helper methods to be used by all tests here...
end
