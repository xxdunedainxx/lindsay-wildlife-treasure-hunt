from src.util.RandomGenerator import RandomGenerator

import jwt
import datetime

#region JwtAuthMsg
class JwtAuthMsg:
    def __init__(self, authd: bool, info: {}):
        self.authd=authd
        self.info=info
#endregion
#region JwAuth
class JwtAuth():
    exp_day_policy: int = 7
    exp_seconds_policy: int =0
    jwt_secret_key: str = RandomGenerator.generate_random_string(10)
    jwt_algo: str = 'HS256'

    def __init__(self):
        pass

    @staticmethod
    def set_jwt_expiration_policy(days: int, seconds: int):
        JwtAuth.exp_day_policy = days
        JwtAuth.exp_seconds_policy = seconds

    @staticmethod
    def set_jwt_algorithm(algo: str):
        JwtAuth.jwt_algo=algo

    @staticmethod
    def set_jwt_secret_key(nkey):
        JwtAuth.jwt_secret_key=nkey

    @staticmethod
    def encode_auth_token(custom_fields: {} = None):
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(
                    days=JwtAuth.exp_day_policy,
                    seconds=JwtAuth.exp_seconds_policy
                ),
                'iat': datetime.datetime.utcnow(),
                'type' : 'client'
            }

            if custom_fields is not None and type(custom_fields) is dict:
                payload.update(custom_fields)

            return jwt.encode(
                payload,
                JwtAuth.jwt_secret_key,
                algorithm=JwtAuth.jwt_algo
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token)->JwtAuthMsg:
        try:
            payload = jwt.decode(auth_token, JwtAuth.jwt_secret_key, algorithms=JwtAuth.jwt_algo)
            return JwtAuthMsg(authd=True, info=payload)
        except jwt.ExpiredSignatureError as e:
            return JwtAuthMsg(authd=False, info={"reason": "Expired"})
        except jwt.InvalidTokenError as e:
            return JwtAuthMsg(authd=False, info={"reason": "InvalidToken"})
#endregion