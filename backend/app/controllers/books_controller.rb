class BooksController < ApplicationController
    before_action :set_category, only: [:index, :create]
    before_action :set_book, only: [:update, :destroy]

    def index
        @books = @category.books
        render json: @books
    end

    def create 
        @books = []
        params[:book].each do |param|
            posted_book = @category.books.new(book_permitted(param))
            @books << posted_book if posted_book.save
        end
        if !@books.empty?
            render json: @books
        else
            render status: 500
        end
    end

    def update
        if @book.update(book_params)
            render json: @book
        else 
            render status: 500
        end
    end 

    def destroy
        @book.destroy
        render status: 200
    end

    private 

    def set_category
        @category = Category.find_by(list_name_encoded: params[:category_list_name_encoded])
        # @category = Category.find(params[:category_id])
    end

    def set_book
        @book = Book.find_by(isbn: params[:isbn])
    end

    def book_params
        params.require(:book).permit(:cover_pic, :title, :description, :author, :publisher, :isbn)
    end

    def book_permitted(param)
        param.permit(:cover_pic, :title, :description, :author, :publisher, :isbn)
    end
end
