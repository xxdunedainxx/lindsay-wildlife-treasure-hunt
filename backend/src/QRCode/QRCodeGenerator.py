import qrcode
from src.util.LogFactory import LogFactory
from src.util.FileIO import FileIO
import os

class QRCodeGenerator:
  QRCODE_DIRECTORY: str = './tmp'

  @staticmethod
  def generate_qr_code_file(address: str, outFile: str):
    fullPath: str = f"{QRCodeGenerator.QRCODE_DIRECTORY}{os.sep}{outFile}"

    LogFactory.MAIN_LOG.info(f"Outputing address {address} to file {fullPath}")
    if FileIO.file_exists(fullPath) == False:
      LogFactory.MAIN_LOG.info(f"creating dir / file {fullPath}")
      FileIO.create_file_if_does_not_exist(path=fullPath)

    img = qrcode.make(address)
    img.save(outFile)