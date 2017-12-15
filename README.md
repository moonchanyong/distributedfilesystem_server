# distributedfilesystem_server

# 환경

Nodejs

socket 통신


# 구현 

socket 통신을 통해 입력받은 데이터로 처리해줌 

ls - directory 내의 파일 및 폴더 사이즈랑 이름 수정날짜 출력

cd  {directory name | .. } - 해당 폴더로 이동 | 상위폴더로이동(root설정 된 폴더의 상위로는 못가게 해놓음 )

cat_read filename - file의 내용을 소켓을 통해 출력

cat_write filename comment - comment를 filename파일에 마지막 뒷부분에 추가로 달아줌(개행 안함)


# comment

파일 관련은 커맨드에 대한 예외처리를 덜해줘서 실행시 에러가 뜨면서 서버가 멈춰서 안정적인 서버라고 할 수 없다.(반성..)

하지만 이 프로젝트의 중점은 안정적인 서버 구현보다는 기능만 보여주고 결과값만 보여주는 프로젝트라 원래의 기능을 다했다고 생각한다. 

교수님 특성 반영해서 서버랑 클라이언트 환경 일부러 다르게하고 소켓통신으로 구현 
