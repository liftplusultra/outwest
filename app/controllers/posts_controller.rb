class PostsController < ApplicationController
  before_action :set_post, only: %i[ show ]

  # GET /posts or /posts.json
  def index
    @posts = Post.with_all_rich_text.preload(:tags).published
    @featured_posts = Post.with_all_rich_text.preload(:tags).published.featured
    tag = params[:tag]
    search = params[:search]

    if tag.present?
      @posts = @posts.joins(:tags).where(tags: {label: [tag]})
    end

    if search.present?
      @posts = @posts.where("title ILIKE ?", "%#{search}%").or(
        @posts.where("LOWER(action_text_rich_texts.body) LIKE LOWER(?)", "%#{search}%")
      )
    end

    @tags = Tag.all
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.friendly.find(params[:id])
    end
end
