Rails.application.routes.draw do
  get 'post/index'
  get 'post/show'
  get 'post/new'
  get 'post/edit'
  mount_devise_token_auth_for 'User', at: 'api/auth'
end

