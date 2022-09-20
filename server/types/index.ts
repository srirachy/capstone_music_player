export type LoginUrlProps = {
  response_type: string;
  client_id: string | any;
  scope: string;
  redirect_uri: string;
  state: string;
};

export type CbUrlProps = {
  code: string;
  redirect_uri: string;
  grant_type: string;
};
