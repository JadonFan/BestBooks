class Book < ApplicationRecord
  belongs_to :category
  validates :category_id, presence: true
  validates :isbn, presence: true, uniqueness: true
end
