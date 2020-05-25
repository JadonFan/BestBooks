class CategoriesController < ApplicationController
    def index
        @categories = Category.all
        render json: @categories
    end

    def create
        @categories = []
        params[:category].each do |param|
            posted_category = Category.new(category_permitted(param))
            @categories << posted_category if posted_category.save
        end
        if !@categories.empty?
            render json: @categories
        else
            render status: 500
        end
    end

    private 

    def category_permitted(param)
        param.permit(:list_name, :list_name_encoded)
    end
end
