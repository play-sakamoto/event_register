class Memory < ApplicationRecord
  # mount_uploader :image, ImageUploader (元仕様)
  belongs_to :user
  has_many :memory_images, dependent: :destroy
  accepts_nested_attributes_for :memory_images, allow_destroy: true

  validates :title, presence: true
  validates :body, presence: true
  validates :public_flag, inclusion: { in: [ true, false ] }

  scope :public_memories, -> { where(public_flag: true) }
end
