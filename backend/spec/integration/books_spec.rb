# frozen_string_literal: true

require 'swagger_helper'
require 'rails_helper'

# Describe the books API
describe 'Books API' do
  before do
    @token = "Bearer #{create(:doorkeeper_access_token).token}"
    @book = create(:book).attributes
  end
  # GET /books
  # Get all books
  path '/api/v1/books' do
    get 'Get all books' do
      tags 'Books'
      security [Bearer: []]
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      response '200', 'books found' do
      end
      response '401', 'unauthorized' do
      end
    end
  end

  # GET /books/:id
  # Get a book by id
  path '/api/v1/books/{id}' do
    get 'Get a book' do
      tags 'Books'
      security [Bearer: []]
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      parameter name: :id, in: :path, type: :string, required: true,
                description: 'ID of the book'
      response '200', 'book found' do
      end
      response '404', 'book not found' do
      end
      response '401', 'unauthorized' do
      end
    end
  end

  # POST /books
  # Create a book
  path '/api/v1/books' do
    post 'Create a book' do
      tags 'Books'
      consumes 'application/json', 'application/xml'
      security [Bearer: []]
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      parameter name: :book, in: :body, schema: {
        type: :object,
        properties: {
          book: {

            title: { type: :string },
            body: { type: :string }
          }
        },
        required: %w[title body]
      }
      it 'returns 201 book created' do
      end
      response '401', 'unauthorized' do
      end
    end
  end
end
