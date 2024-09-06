module ApplicationHelper
  def empty_collection_message(klass)
    content_tag :div do
      concat content_tag(:h2, "No matching #{klass.to_s.pluralize} found.")
      concat link_to "Clear Search", posts_path, class: "btn btn-primary"
    end
  end
end
