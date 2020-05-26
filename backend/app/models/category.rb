class Category < ApplicationRecord
  has_many :books, dependent: :destroy
  validates :list_name_encoded, presence: true, uniqueness: true
end
