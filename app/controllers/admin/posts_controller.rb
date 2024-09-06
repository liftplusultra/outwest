class Admin::PostsController < Admin::ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        flash[:success] = "Post added."
        format.turbo_stream { redirect_to admin_posts_path }
      else
        flash.now.alert = @post.error_sentence
        format.turbo_stream {render_turbo_flashes!}
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        flash[:success] = "Post updated."
        format.turbo_stream { redirect_to admin_posts_path }
      else
        flash.now.alert = @post.error_sentence
        format.turbo_stream {render_turbo_flashes!}
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy!

    respond_to do |format|
      format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.friendly.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :content, :header_image, :published, :featured, tag_ids: [])
  end
end
