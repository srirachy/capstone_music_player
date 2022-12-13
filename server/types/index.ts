export type LoginUrlProps = {
  response_type: string;
  client_id: string;
  scope: string;
  redirect_uri: string;
  state: string;
};

export type CbUrlProps = {
  code: string;
  redirect_uri: string;
  grant_type: string;
};

export type ShuffUrlProps = {
  state: string;
};

export type RepUrlProps = {
  state: string;
};
