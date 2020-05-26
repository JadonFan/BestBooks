class Category < ApplicationRecord
  has_many :books, dependent: :destroy
  validates :list_name_encoded, uniqueness: true
end
