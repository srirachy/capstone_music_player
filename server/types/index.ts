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

export type ShuffUrlProps = {
  state: string;
};

export type RepUrlProps = {
  state: string;
};

export type TrackProps = {
  uri: string;
  offset: any;
  position_ms: number;
};

export type OffsetProp = {
  position: number;
};
