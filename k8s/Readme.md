# Run this project on Kubernetes

## potential problem 

```
rm: cannot remove '/bitnami/mysql/data/lost+found': Permission denied
```
see : https://stackoverflow.com/questions/52601684/kubernetes-mysql-image-persistent-volume-is-non-empty-during-init



## cmd

```
docker_hub_login=yourdockerhublogin

docker_hub_login=nicodeur


# create secret
echo -n 'root' > ./username
echo -n 'db_password' > ./password

kctl create secret generic tuto-db-user-pass --from-file=./username --from-file=./password

rm username && rm password

# create stack
kctl create -f k8s

# delete stack
kctl delete -f k8s

```



